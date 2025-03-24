from flask import Flask, g, jsonify
from flask_cors import CORS
import sqlite3
import json

PR_DB_PATH = "./purely-relate.db"
CL_DB_PATH = "./chain-links.db"

app = Flask(__name__)
CORS(app)


def connect_db(path: str):
    sql = sqlite3.connect(path)
    return sql


def get_db(path: str):
    if not hasattr(g, "sqlite3"):
        g.sqlite3_db = connect_db(path)
    return g.sqlite3_db


@app.teardown_appcontext
def close_db(error):
    if hasattr(g, "sqlite_db"):
        g.sqlite3_db.close()


@app.route("/purely-relate/episodes", methods=["GET"])
def getPREpisodes():
    db = get_db(PR_DB_PATH)
    sql = "SELECT id, title FROM matches"
    cursor = db.cursor().execute(sql)
    episodes = cursor.fetchall()
    if not episodes:
        return jsonify({"message": "Error, no episodes"}), 404
    episodes = [{"id": a, "title": b} for a, b in episodes]
    return jsonify(episodes)


@app.route("/purely-relate/<int:episode_id>", methods=["GET"])
def getPREpisodeContents(episode_id):
    db = get_db(PR_DB_PATH)
    result = {}
    sql = "SELECT * FROM matches WHERE id = ? LIMIT 1"
    cursor = db.cursor().execute(sql, (episode_id,))
    match_title = cursor.fetchall()
    if not match_title:
        return jsonify({"message": "Match not found"}), 404

    result |= {"title": match_title[0][1]}

    # RELATIONS
    sql = """\
SELECT glyph, clues, connection, explanation
FROM connequences
WHERE kind = 'connection' AND match = ?
ORDER BY (
    CASE glyph
        WHEN 'O' THEN 1
        WHEN 'L' THEN 2
        WHEN 'I' THEN 3
        WHEN 'T' THEN 4
        WHEN 'J' THEN 5
        WHEN 'Z' THEN 6
        ELSE 0
    END
)
"""
    cursor = db.cursor().execute(sql, (episode_id,))
    relations = cursor.fetchall()
    relations = [{"glyph": a, "clues": json.loads(
        b), "relation": c, "explanation": d} for a, b, c, d in relations]

    result |= {"relations": relations}

    # PROGRESSIONS
    sql = """\
SELECT glyph, clues, connection, explanation
FROM connequences
WHERE kind = 'sequence' AND match = ?
ORDER BY (
    CASE glyph
        WHEN 'O' THEN 1
        WHEN 'L' THEN 2
        WHEN 'I' THEN 3
        WHEN 'T' THEN 4
        WHEN 'J' THEN 5
        WHEN 'Z' THEN 6
        ELSE 0
    END
)
"""
    cursor = db.cursor().execute(sql, (episode_id,))
    progressions = cursor.fetchall()
    progressions = [{"glyph": a, "clues": json.loads(
        b), "relation": c, "explanation": d} for a, b, c, d in progressions]

    result |= {"progressions": progressions}

    # RELATING SURFACE
    sql = """\
SELECT glyph
FROM walls
WHERE match = ?
"""

    cursor = db.cursor().execute(sql, (episode_id,))
    surfaces = cursor.fetchall()
    surfaces = [{"glyph": a[0]} for a in surfaces]

    for surface in surfaces:
        glyph = surface["glyph"]
        sql = """\
SELECT g.clues, g.connection
FROM wall_groups g
INNER JOIN walls w
ON g.wall = w.id
WHERE w.match = ? AND w.glyph = ?
ORDER BY (
    CASE w.glyph
        WHEN 'O' THEN 1
        WHEN 'L' THEN 2
        WHEN 'I' THEN 3
        WHEN 'T' THEN 4
        WHEN 'J' THEN 5
        WHEN 'Z' THEN 6
        ELSE 0
    END
),
    g.id;
"""
        cursor = db.cursor().execute(sql, (episode_id, glyph,))
        group = cursor.fetchall()
        group = [{"clues": json.loads(a), "relation": b} for a, b in group]
        surface |= {"groups": group}

    result |= {"surfaces": surfaces}

    # CONSONANTS ONLY
    sql = """\
SELECT id, category
FROM vowel_sets
WHERE match = ?
ORDER BY id
"""

    cursor = db.cursor().execute(sql, (episode_id,))
    consonants = cursor.fetchall()
    consonants = [{"id": a, "relation": b} for a, b in consonants]
    for round in consonants:
        id = round["id"]
        del round["id"]
        sql = """\
SELECT c.clue, c.solution
FROM vowel_clues c
INNER JOIN vowel_sets s
ON c.[set] = s.id
WHERE s.match = ? AND s.id = ?
ORDER BY s.id, c.id
"""
        cursor = db.cursor().execute(sql, (episode_id, id,))
        group = cursor.fetchall()
        group = [{"clue": a, "answer": b} for a, b in group]

        round |= {"questions": group}

    result |= {"consonants": consonants}

    return jsonify(result)


@app.route("/chain-links/puzzles", methods=["GET"])
def getCLPuzzles():
    db = get_db(CL_DB_PATH)
    sql = "SELECT id FROM puzzles"
    cursor = db.cursor().execute(sql)
    episodes = cursor.fetchall()
    if not episodes:
        return jsonify({"message": "Error, no episodes"}), 404
    episodes = [{"id": a} for a in episodes]
    return jsonify(episodes)


@app.route("/chain-links/<int:puzzle_id>", methods=["GET"])
def getCLPuzzleContents(puzzle_id):
    db = get_db(CL_DB_PATH)
    result = {}
    sql = "SELECT id FROM puzzles where id = ? LIMIT 1"
    cursor = db.cursor().execute(sql, (puzzle_id,))
    episode = cursor.fetchall()
    if not episode:
        return jsonify({"message": "Error, episode doesn't exist"}), 404

    # chains
    sql = """\
SELECT left, middle, right
FROM chains
WHERE puzzle = ?
ORDER BY qnum
"""
    cursor = db.cursor().execute(sql, (puzzle_id,))
    chains = cursor.fetchall()
    chains = [{"left": a, "middle": b, "right": c} for a, b, c in chains]

    result |= {"chains": chains}

    # connection

    sql = """\
SELECT connection
FROM connections
WHERE puzzle = ?
LIMIT 1
"""

    cursor = db.cursor().execute(sql, (puzzle_id,))
    connection = cursor.fetchone()[0]

    result |= {"connection": connection}

    return jsonify(result)


if __name__ == "__main__":
    app.run(host="0.0.0.0")

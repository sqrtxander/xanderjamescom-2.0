from flask import Flask, g, jsonify
from flask_cors import CORS
import sqlite3
import json

app = Flask(__name__)
CORS(app)


def connect_db():
    sql = sqlite3.connect("./purely-relate.db")
    return sql


def get_db():
    if not hasattr(g, "sqlite3"):
        g.sqlite3_db = connect_db()
    return g.sqlite3_db


@app.teardown_appcontext
def close_db(error):
    if hasattr(g, "sqlite_db"):
        g.sqlite3_db.close()


@app.route("/purely-relate/api/episodes", methods=["GET"])
def getEpisodes():
    db = get_db()
    sql = "SELECT id, title FROM matches"
    cursor = db.cursor().execute(sql)
    episodes = cursor.fetchall()
    if not episodes:
        return jsonify({"message": "Error, no episodes"}), 404
    episodes = [{"id": a, "title": b} for a, b in episodes]
    return jsonify(episodes)


@app.route("/purely-relate/api/<int:episode_id>", methods=["GET"])
def getEpisodeContents(episode_id):
    db = get_db()
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
        WHEN 'jackal' THEN 1
        WHEN 'pots' THEN 2
        WHEN 'lotus' THEN 3
        WHEN 'vulture' THEN 4
        WHEN 'man' THEN 5
        WHEN 'sickle' THEN 6
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
        WHEN 'jackal' THEN 1
        WHEN 'pots' THEN 2
        WHEN 'lotus' THEN 3
        WHEN 'vulture' THEN 4
        WHEN 'man' THEN 5
        WHEN 'sickle' THEN 6
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
        WHEN 'pots' THEN 2
        WHEN 'man' THEN 5
        WHEN 'lion' THEN 2
        WHEN 'water' THEN 5
        WHEN 'alpha' THEN 2
        WHEN 'beta' THEN 5
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


if __name__ == "__main__":
    app.run(host="0.0.0.0")

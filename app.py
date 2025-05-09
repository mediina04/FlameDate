from flask import Flask
from models.user import db
from config import Config

app = Flask(__name__)
app.config.from_object(Config)  # Carga la configuración desde config.py

db.init_app(app)

# Crear las tablas si no existen
with app.app_context():
    db.create_all()

@app.route('/')
def home():
    return "¡Bienvenido a FlameDate!"

if __name__ == "__main__":
    app.run(debug=True)

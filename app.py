from flask import Flask, render_template
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
    return render_template('Login.html')

@app.route('/signup')
def signup():
    return render_template('Signup.html')

@app.route('/perfil')
def perfil():
    return render_template('Perfil.html')

@app.route('/swipes')
def swipes():
    return render_template('Swipes.html')

@app.route('/chats')
def chats():
    return render_template('Chats.html')

@app.route('/login')
def login():
    return render_template('Login.html')

if __name__ == "__main__":
    app.run(debug=True)
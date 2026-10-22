from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import os

app = Flask(__name__)
CORS(app)

def calcular_superficie(ancho, largo):
    return ancho * largo

def calcular_volumen(espesor, ancho, largo):
    return espesor * ancho * largo

class BaseDatosJSON:
    def __init__(self, archivo):
        self.archivo = archivo

    def leer(self):
        if not os.path.exists(self.archivo):
            datos = {"usuarios": [], "calculos": []}
            with open(self.archivo, 'w') as f:
                json.dump(datos, f, indent=4)
            return datos
        with open(self.archivo, 'r') as f:
            return json.load(f)

    def guardar(self, datos):
        with open(self.archivo, 'w') as f:
            json.dump(datos, f, indent=4)

    def buscar_usuario(self, nombre):
        db = self.leer()
        for u in db['usuarios']:
            if u['usuario'] == nombre:
                return u
        return None

db_manager = BaseDatosJSON('datos.json')

@app.route('/')
def inicio():
    return "Backend de BuildCalc funcionando correctamente."

@app.route('/api/registro', methods=['POST'])
def registro():
    req = request.json
    if db_manager.buscar_usuario(req.get('usuario')):
        return jsonify({"error": "El usuario ya existe"}), 400

    db = db_manager.leer()
    db['usuarios'].append({
        "usuario": req.get('usuario'),
        "clave": req.get('clave'),
        "rol": req.get('rol')
    })
    db_manager.guardar(db)
    return jsonify({"mensaje": "Usuario registrado"}), 201

@app.route('/api/login', methods=['POST'])
def login():
    req = request.json
    u = db_manager.buscar_usuario(req.get('usuario'))
    if u and u['clave'] == req.get('clave'):
        return jsonify({"mensaje": "Login exitoso", "rol": u['rol']}), 200
    return jsonify({"error": "Credenciales incorrectas"}), 401

@app.route('/api/recuperar', methods=['POST'])
def recuperar():
    req = request.json
    u = db_manager.buscar_usuario(req.get('usuario'))
    if u:
        return jsonify({"clave": u['clave']}), 200
    return jsonify({"error": "Usuario no encontrado"}), 404

@app.route('/api/guardar-calculo', methods=['POST'])
def guardar_calculo():
    req = request.json
    modulo = req.get('modulo')
    datos = req.get('datos')
    resultados = {}
    
    if modulo == "Muro":
        sup = calcular_superficie(datos['largo'], datos['alto'])
        if datos['espesor'] == "30":
            c, a, l = sup * 15.2, sup * 0.115, sup * 120
        else:
            c, a, l = sup * 10.9, sup * 0.09, sup * 90
        resultados = {"superficie": sup, "cemento": c, "arena": a, "ladrillos": l}
        
    elif modulo == "Viga":
        largo = datos['largo']
        resultados = {"cemento": largo*9, "arena": largo*0.02, "piedra": largo*0.02, "h8": largo*4, "h4": largo*3}
        
    elif modulo == "Columna":
        largo = datos['largo']
        resultados = {"cemento": largo*7.5, "arena": largo*0.016, "piedra": largo*0.016, "h10": largo*6, "h4": largo*3}
        
    elif modulo == "Contrapiso":
        vol = calcular_volumen(datos['espesor'], datos['ancho'], datos['largo'])
        resultados = {"volumen": vol, "cemento": vol*105, "arena": vol*0.45, "piedra": vol*0.9}
        
    elif modulo == "Techo":
        sup = calcular_superficie(datos['ancho'], datos['largo'])
        resultados = {"superficie": sup, "cemento": sup*33, "arena": sup*0.072, "piedra": sup*0.072, "h8": sup*7, "h6": sup*4}
        
    elif modulo == "Pisos":
        sup = calcular_superficie(datos['ancho'], datos['largo'])
        recortes = sup * 0.10
        resultados = {"superficie": sup, "recortes": recortes, "total": sup + recortes}
        
    elif modulo == "Pintura":
        sup = datos['superficie']
        resultados = {"litros": sup / 6}

    resultados_redondeados = {}
    for clave, valor in resultados.items():
        resultados_redondeados[clave] = round(valor, 3)

    nuevo_calculo = {
        "modulo": modulo,
        "fecha": req.get('fecha'),
        "datos_entrada": datos,
        "resultados": resultados_redondeados
    }
    
    db = db_manager.leer()
    db['calculos'].append(nuevo_calculo)
    db_manager.guardar(db)
    
    return jsonify({"resultados": resultados_redondeados}), 200

if __name__ == '__main__':
    app.run(debug=True, port=5000)
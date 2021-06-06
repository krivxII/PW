# Logica de persistencia 

## Estructura de datos de la percistencia
```javascript
Usuario = {
    "nombreUsuario": string,
    "numeroJuegos": integer,
    "numeroVictorias": integer,
    "numeroDerrotas": integer,
}

Usuario-Partida-Id{
        "jugador",
        "IdPartida",
        "vidas",
        "paresRestantes",
        "cartas",
        "cartasVolteadas",
        "cartasRamdon",
        "turnos",
        "errores",
        "puntos",
        "carta1",
        "carta2",
}
```

## Acciones de la percistencia 

- Crear Usuario: Crea un usuario nuevo con la estructura
```javascript
Usuario = {
    "nombreUsuario": "nombreUsuario",
    "numeroJuegos": 0,
    "numeroVictorias": 0,
    "numeroDerrotas": 0,
}
```

- 
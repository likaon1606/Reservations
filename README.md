app.use('/api/v1/users', usersRouter)
Para poder crear usuarios, es decir, poder registrarse y logearse para obtener un token e ingresar para seguir con la reservación.

app.use('/api/v1/rooms', roomsRouter)
Aquí se pueden crear las opciones de cuartos, incluí la opción de introducir imagen para poder tener una vista del tipo de cuarto, además de poder modificar sus elementos.

app.use('/api/v1/reservations', reservationsRouter)
En este endpoint se puede asignar de la misma forma, una serie de acciones como crear reservación, modificar los campos o consultar las reservaciones pendientes o pagadas, ya que las eliminadas no aparecerán.

Nota: Cada endpoint tiene su respectivo nombre clave para facilitar la identificación y además la ruta “room” y “reservations” están protegidas por el token, por lo cual, no se puede tener acceso hasta que se haya registrado y logeado el usuario.

/// =========================================================================== ///
/// =============================== HENRY-CATS ================================ ///
/// =========================================================================== ///

'use strict';

let cats = [];
let accessories = [];

module.exports = {
  reset: function () {
    // No es necesario modificar esta función. La usamos para "limpiar" los arreglos entre test y test.

    cats = [];
    accessories = [];
  },

  // ==== COMPLETAR LAS SIGUIENTES FUNCIONES (vean los test de `controller.js`) =====

  addCat: function (name) {
    // Agrega un nuevo felin@, verificando que no exista anteriormente en base a su nombre.
    // En caso de existir, no se agrega y debe arrojar el Error ('El gato o gata ya existe') >> ver JS throw Error
    // Debe tener una propiedad <age> que inicialmente debe ser '1 year'.
    // Debe tener una propiedad <color> que inicialmente es un array vacío.
    // Debe tener una propiedad <accesories> que inicialmente es un array vacío.
    // El gato o gata debe guardarse como un objeto con el siguiente formato:
    // { name: name,  age: '1 year' , color: []}
    // En caso exitoso debe retornar el string '<nombre del gato o gata> fue creado correctamente'.
    let gato = {
      name: name,
      age: '1 year',
      color: [],
      accessories: [],
    };
    let gatitoRep = cats.filter(e => e.name === name);
    if (gatitoRep.length) {
      throw new Error('El gato o gata ya existe');
    }
    cats.push(gato);
    return `${gato.name} fue creado correctamente`;
  },

  listCats: function (age) {
    // En caso de recibir el parámetro <age>, devuelve sólo los gatos correspondientes a dicho age.
    // Si no recibe parámetro, devuelve un arreglo con todos los gatos.
    if (!age) return cats;
    const catsFound = cats.filter(g => g.age === age);

    return catsFound;
  },

  addAccessory: function ({ id, color, type, description }) {
    // Agrega un nuevo accesorio.
    // Si el accesorio ya existe, no es agregado y arroja un Error ('El accesorio con el id <id> ya existe')
    // Debe devolver el mensaje 'El accesorio <type> fue agregado correctamente'
    // Inicialmente debe guardar la propiedad <popularity> del accesorio como 'low' por defecto
    // Si la descripción supera los 140 caracteres, debe arrojar un error
    const accesoryFound = accessories.find(a => a.id === id);
    if (accesoryFound)
      throw new Error(`El accesorio con el id ${id} ya existe`);
    if (description.length > 140)
      throw new Error('La descripción supera los 140 caracteres');
    accessories.push({
      id: id,
      color: color,
      type: type,
      description: description,
      popularity: 'low',
    });

    return `El accesorio ${type} fue agregado correctamente'`;
  },

  getAccessories: function (type, color) {
    // Devuelve un array con todos los accesorios.
    // Si recibe parámetro "type", debe retornar  los accesorios que coincidan con el tipo.
    // Si recibe parámetro "color" debe retornar los accesorios que coincidan con el color
    // Si recibe ambos parámetros, se devuelven los accesorios que coincidan con el color o con el tipo
    let accesoriesFound = accessories.filter(
      c => c.type === type || c.color === color
    );
    if (accesoriesFound.length) return accesoriesFound;

    return accessories;
  },

  deleteAccessory: function (id) {
    // Elimina un accesorio del array
    // Si el id no existe dentro del array de accesorios, arrojar un Error ('El accesorio con el id <id> no fue encontrado')
    // Una vez eliminado el accesorio del array, devolver un mensaje que diga 'El accesorio con el id <id> fue eliminado correctamente'
    const accesoryFound = accessories.find(a => a.id === id);
    if (!accesoryFound)
      throw new Error(`El accesorio con el id ${id} no fue encontrado`);
    const index = accessories.indexOf(accesoryFound);
    accessories.splice(index, 1);

    return `El accesorio con el id ${id} fue eliminado correctamente`;
  },

  modifyAccessory: function (obj) {
    // Modifica un accesorio del array
    // Si el id no existe dentro del array de accesorios arrojar un Error ('accesorio no encontrado')
    // Si el objeto viene vacio, arrojar un Error ('No se detectaron cambios a aplicar')
    // Una vez modificado el accesorio del array, devolver el accesorio modificado
    if (Object.keys(obj).length === 0)
      throw new Error('No se detectaron cambios a aplicar');
    let accesoryFound = accessories.find(a => a.id === obj.id);
    if (!accesoryFound) throw new Error('accesorio no encontrado');

    accesoryFound = { ...accesoryFound, ...obj };
    for (let i = 0; i < accessories.length; i++) {
      if (accessories[i].id === accesoryFound.id) {
        accessories[i] = accesoryFound;
      }
    }
    return accesoryFound;
  },

  increaseAccesoryPopularity: function (accessoryId) {
    // Este método es complementario a 'addCatAccessory'
    // Actualiza la propiedad <popularity> del accesorio,
    // Si se actualizó la popularidad del accesorio, devolver true
    // Si no se actualizó la popularidad del accesorio, debe devolver false
    //let popular = this.getAccessoryPopularity(accessoryId)
    const accesoryFound = accessories.found(acc => acc.id === accessoryId);
    if (accesoryFound.popularity === 'low') return false;
    else return true;
  },

  addCatAccessory: function (catName, accessoryId) {
    // Agrega un accesorio a un felin@
    // Si el felin@ ya tiene puesto el accesorio, arrojar un Error('El gato <nombre_gato> ya tiene el accesorio puesto') y no lo agrega
    // Si el gato no existe arrojar un Error ('El gato <nombre_gato> no existe')
    // Si el id de accesorio no existe arrojar un Error ('accesorio no encontrado' y no actualiza la popularidad)
    const felinoFound = cats.find(c => c.name === catName);
    if (!felinoFound) throw new Error(`El gato ${catName} no existe`);
    const accesorioFound = accessories.find(acc => acc.id === accessoryId);
    if (!accesorioFound) throw new Error('Accesorio no encontrado');

    const catAcc = felinoFound.accessories.find(acc => acc.id === accessoryId);
    if (catAcc)
      throw new Error(`El gato ${catName} ya tiene el accesorio puesto`);

    felinoFound.accessories.push(accesorioFound);
    this.getAccessoryPopularity(accessoryId);

    return `El accesorio ${accesorioFound.type} fue agregado a ${catName} con exito`;
  },

  getAccessoryPopularity: function (accessoryId) {
    //Devuelve la popularidad de un accesorio
    // Para eso deberás comprobar cuantos gatos visten el accesorio recibido por parámetros (es un id)
    // Si la cantidad de gatos que visten el accesorio son 2, entonces la popularidad del accesorio debe valer 'average'
    // Si la cantidad de gatos que visten el accesorio son 3, entonces la popularidad del accesorio debe valer 'high'
    const accesoryFound = accessories.find(acc => acc.id === accessoryId);
    if (!accesoryFound) throw new Error('Accesorio no encontrado');
    let contador = 0;
    cats.map(cat => {
      const catAcc = cat.accessories.find(acc => acc.id === accessoryId);
      if (catAcc) contador++;
    });

    if (contador < 2) {
      accessories.find(acc => acc.id === accessoryId).popularity = 'low';
      return 'low';
    } else if (contador === 2) {
      accessories.find(acc => acc.id === accessoryId).popularity = 'average';
      return 'average';
    } else if (contador >= 3) {
      accessories.find(acc => acc.id === accessoryId).popularity = 'high';
      return 'high';
    }
  },
};

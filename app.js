const express = require('express')
const Product = require('./libs/Product')
const { Router } = express;
const router = Router();
const handlebars = require('express-handlebars');
const app = express();
const PORT = process.env.PORT || 8080
// con __dirname traemos la ruta absoluta
// instanciamos el objeto y le pasamos un filename segun indica el constructor de la clase
const product = new Product(__dirname + "/data/products.json")


// no olvidarse de esto si vamos a responder con json. Sino lo muestra vacío
app.use(express.json()) 
 // Reconoce lo que le pasemos en el request como objeto
app.use(express.urlencoded({extended: true}))

// para que todas las rutas de abajo empiecen con /api/productos
app.use("/api/products", router)
// configura nuestro directorio estático
app.use(express.static(__dirname + './views'))
// escuchamos el puerto

const server = app.listen(PORT, async () => {
    console.log(`Servidor Corriendo en el puerto: ${server.address().port}`)
});

server.on('error', function (e) {
    console.log('Error al conectar con el servidor', e);  
});
        

/////////////// RUTAS ///////////////////////

// trae toda la lista
router.get("/", (req, res) => {
    return res.json(product.list)
})

// trae un objeto de la lista
router.get("/:id", (req, res) => {
    const id = req.params.id
    return res.json(product.find(id))
})

// inserta un objeto en la lista
router.post("/", (req, res) => {
    req.body.price = +req.body.price;
    const newProduct = req.body
    return res.json(product.insert(newProduct))
})

// actualiza un objeto de la lista
router.put("/:id", (req, res) => {
    const updateProduct = req.body
    const id = req.params.id
    return res.json(product.update(id, updateProduct))
})

// elimina un objeto de la lista
router.delete("/:id", (req, res) => {
    const id = req.params.id
    return res.json(product.delete(id))
})


// -------------------------------------------------------------------------------------------




// agregados desafío 5

// defino el motor de plantillas (habdlebars)
app.engine('handlebars',handlebars.engine())

// especifica la carpeta de plantillas (handlebars)
app.set('views', './views-handlebars')
app.set('view engine', 'handlebars')

// especifica la carpeta de plantillas (pug)
// app.set('views', './views-pug')
// app.set('view engine', 'pug')

// especifica la carpeta de plantillas (ejs)
// app.set('views', './views-ejs')
// app.set('view engine', 'ejs')



app.get("/", (req, res) => {
    res.render('form')
})

app.get("/products", (req, res) => {
    const products = product.list
    res.render('products', {products})
})

app.post("/products", (req, res) => {
    const msg = "Product added!" // como paso esto por parametro por el res.redirect??
    newProduct = req.body
    product.insert(newProduct)
    res.redirect('back');
})
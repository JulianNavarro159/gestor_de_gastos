const { Review, User} = require('../../db');
require('dotenv').config();

const createReview = async(req, res) => {
    try {
        const {ranking, comment, user} = req.body;

        //si no existen esos datos || no coinciden 
        if(!ranking || !comment || !user) return res.status(400).send("Lo siento, las propiedades no coinciden")
        //limitamos un rango entre 0 y 5
        if(ranking > 5 || ranking < 0) return res.status(400).send("Ranking no puede ser menor de 0 o mayor a 5")
        //Limitamos el numero de caracteres en comment 
        if(comment.length > 255) return res.status(400).send("Haz excedido el limite de caracteres")

        const userExists = await User.findOne({where: {id: user}});
        
        //verificamos que exista el usuario 
        if(!userExists) return res.status(400).send("Usuario no existente");

        await Review.create({
            ranking,
            comment,
            idUser: user
        })

        return res.status(200).send("Tu reseña fue creada con exito..!");
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

const getReview = async(req, res) => {

    try {
        const reviews = await Review.findAll({
            include: User
        });

        //en caso de no tener reseñas creadas en el momento
        if(!reviews) return res.status(200).send("Todavia no tienes reseñas")
        return res.status(200).json(reviews);
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

const updateReview = async(req, res) => {
    try {
        const {id} = req.params;

        if(!id ) return res.status(400).send("Error de sintaxis");

        const review = await Review.findOne({where: {id}});

        if(!review) return res.status(400).send("No existe una reseña con este ID");

        review.set(req.body);
        await review.save();

        return res.status(200).json(review);
        
    } catch (error) {
        return res.status(500).send(error.message);
    }
}
const deleteReview = async(req, res) => {
    try {
        const {id} = req.params;
        const review = await Review.findOne({where: {id}});
        
        //en caso de no haber ningun dato con ese ID
        if(!review) return res.status(400).send("No hay coincidencias en la base de datos");

        await review.destroy();
        
        return res.status(200).json(review);
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

module.exports = {
    createReview,
    getReview,
    updateReview,
    deleteReview
};
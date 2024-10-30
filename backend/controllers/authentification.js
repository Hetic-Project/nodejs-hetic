const user = require("../models/user")

const bcrypt = require("bcryptjs"); // Pour le hashage des mots de passe
const { body } = require("express-validator") // Pour validation et désinfection des inputs dans le body
const jwt = require('jsonwebtoken')

require('dotenv').config()
const JWT_KEY = process.env.JWT_KEY

module.exports.login = async (req, res, next) => {
    try{
        const { username, password } = req.body
    
        // Vérifications du remplissage des champs "username" et "mot de passe" ; renvoi d'un message d'erreur si l'un des champs manque
        if (!username || !password) {
            return res.json({ success: false, msg: `Veuillez renseigner tous les champs.` })
        }

        let user = await checkUser(username)
        console.log(user)

        if (!user) {
            return res.json({ success: false, msg: `L'username ${username} n'est asociée à aucun compte.` })
        }

        // Vérification du mdp fourni en le comparant avec celui hashé dans la bdd avec la fonction "comparePassword"
        const checkpassword = await comparePassword(password, user.password);
        
        // Renvoi les données de l'utilisateur si les mdp correspondent ou msg d'erreur si ne correspondent pas
        if (checkpassword){
            let token = generateJWT(user._id)
            return res.json({ success: true, data: user, token })
        } else {
            return res.json({ success: false, msg: `L'username ou le mot de passe est invalide, veuillez réessayer.` })
        }

    } catch(error) {
        console.log(error)
        return res.status(500).json({ success: false, msg: error })
    }
}

module.exports.register = [
    body('password').trim(), // Supprimer les espaces blancs dans le mot de passe inséré
    body('confirmPassword').trim(),
    async (req, res, next) => {
        try {

            const { username, password, confirmPassword } = req.body || {}
            
            if (!username || !password || !confirmPassword) {
                return res.json({ success: false, msg: `Veuillez renseigner tous les champs.` })
            }
        
            const checkedUser = await checkUser(username)
        
            if (checkedUser){
                return res.json({ success: false, msg: `L'username ${username} est déjà associé à un compte.` })
            }
        
            if (password !== confirmPassword) {
                return res.json({ success: false, msg: "Les mots de passe ne correspondent pas." })
            }

            const hashedPassword = await hashPassword(password, 10)
        
            const newUser = await user.create({ 
                ...req.body,
                password: hashedPassword,
            })
            return res.json({ success: true, data: newUser })

        } catch (error) {
            console.log(error)
            return res.json({ success: false, msg: error })
        }
    }
]



// Fonction pour vérifier si l'username fourni est dans la bdd
const checkUser = async (username) => {
    try {  
      const checkUser = await user.findOne({username})

      if (checkUser) {
          return checkUser
      } 
      return null

  } catch (error) {
      console.log(error)
      throw error
  }
}

// Fonction pour hasher le password
const hashPassword = async (password, saltRounds) => {
    try {
      const salt = await bcrypt.genSalt(saltRounds)
      return await bcrypt.hash(password, salt)

    } catch (error) {
      console.log(error)
    }
    return null;
  };

// Fonction pour comparer les mots de passe 
async function comparePassword(password, hashedPassword) {
    try {
        const match = await bcrypt.compare(password, hashedPassword)
        return match

    } catch (error) {
        throw error
    }
}

// Fonction de génération de token
const generateJWT = (userId) => {
    return jwt.sign({ userId }, JWT_KEY, {expiresIn: '1h' })
}
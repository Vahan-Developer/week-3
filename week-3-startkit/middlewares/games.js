const { readData, writeData} = require("../utils/data");

const getAllGames = async (req, res, next) => {

const games = await readData("./data/games.json");

if (!games) {

res.status(400);

res.send({

status: "error",

message: "Hет игр в базе данных. Добавьте игру."

});

return;
}
req.games = games;
 next();
};

const checkIsTitelInArray = (req, res, next) => {
req.isNew = !Boolean(req.games.find((item) => item.title === req.body.title));
next();
};
const updateGamesArray = (req,res, next) => {
if (req.isNew) {
    const inArray = req.games.map((item) => Number(item.id));
    let maximalId;
    
    if (inArray.length > 0) {
    
    maximalId = Math.max(...inArray);
    
    } else {
    
    maximalId = 0;
    
    }
    
        
        req.games = [...req.games, req.updatedObject];
        next();
        return;
        } else {
          
        res.status(400);
        
        res.send({ status: "error", message: "Игра с таким именем уже есть." })
        
      
        
        }
    };
await writeData("./data/games.json", req.games);
res.send({
games: req.games, 
updated: req.updatedObject, 
});
const updateGamesFile = async (req,res,next) => {
    await writeData("./data/games.json", req.games);
    next();
};


const findGameById = (req, res, next) =>{
     const id = Number(req.params.id);

req.game = req.games.find(item => item.id === id);
next();
};

const deleteGame = (req, res, next) => {

    const id = req.game.id;
    
    const index = req.games.findIndex((item) =>
         item.id===id);
     req.games.splice(index, 1);
    next();
};




module.exports = {
    getAllGames,
    checkIsTitelInArray,
    updateGamesArray,
    updateGamesFile,
    findGameById,
    deleteGame
};
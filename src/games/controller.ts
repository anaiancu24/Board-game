import { JsonController, Get, Post, HttpCode, Body, Put, Param, NotFoundError, BadRequestError} from 'routing-controllers'
import Game from './entity';

@JsonController()
export default class MainController {

  @Get("/games")
  async allGames() {
    const games = await Game.find()
    return { games }
  }


@Post("/games")
@HttpCode(201)
createGame(
  @Body() game: Game
) {
  return game.save()
}

@Put("/games/:id")
async updateGame(
  @Param('id') id: number,
  @Body() update: Partial<Game>
) {
  const game = await Game.findOne(id)

  if (!game) throw new NotFoundError('Game cannot be found')

  if (update.color) {
    if (update.color !== 'red' && update.color !== 'blue' && update.color !== 'yellow'&& update.color !== 'green' && update.color !== 'magenta' )  {
      throw new BadRequestError('invalid color')
    }
  }
  
  if (update.board) {
    
    const moves = (board1, board2) => 
    board1
      .map((row, y) => row.filter((cell, x) => board2[y][x] !== cell))
      .reduce((a, b) => a.concat(b))
      .length
    
    if ( moves(game.board, update.board) <8 ) {
      throw new BadRequestError('you are allowed only 1 move')
    }
  }

  return Game.merge(game, update).save()
}

}

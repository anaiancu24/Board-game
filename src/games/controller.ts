import { Controller, Get, Post, HttpCode, Body, Put, Param, NotFoundError, BadRequestError } from 'routing-controllers'
import Game from './entity';

@Controller()
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
  if (update.color !== 'red' && update.color !== 'blue' && update.color !== 'yellow'&& update.color !== 'green' && update.color !== 'magenta' )  {
    throw new BadRequestError('invalid color')
  }
  return Game.merge(game, update).save()
}

}

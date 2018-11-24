import { Controller, Get, Post, HttpCode, Body } from 'routing-controllers'
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

}

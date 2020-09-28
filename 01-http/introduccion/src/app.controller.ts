import {Body, Controller, Get, Post, Req, Res, Session} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('login')
  login(
      @Res() response
  ){
    return response.render('login/login')
  }
  @Post('login')
  loginPost(
      @Body() parametrosConsulta,
      @Res() response,
      @Session() session
  ){
    //validamos datos
    const usuario=parametrosConsulta.usuario
    const password=parametrosConsulta.password
    if(usuario=='andrea'&& password=='1234'){
      session.usuario=usuario
      session.roles=['Admnistrador']
      return response.redirect('protegido')
    }else{
      if(usuario=='guiomar'&& password=='5678'){
        session.usuario=usuario
        session.roles=['Supervisor']
      }else {
        return response.redirect('/usuario')
      }
    }


  }
  @Get('protegido')
  protegido(
      @Res() response,
      @Session() session,
  ) {
    const estaLogeado = session.usuario;
    if (estaLogeado) {
      return response.render(
          'login/protegido',
          {
            usuario: session.usuario,
            roles: session.roles
          }
      )
    } else {
      return response.redirect('/login')
    }
  }
  @Get('logout')
  logout(
    @Session() session,
    @Res() res,
    @Req() req
  ){
    session.username=undefined
    session.roles=undefined
    req.session.destroy();
    return res.redirect('login')
  }




}

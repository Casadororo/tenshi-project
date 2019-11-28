import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.page.html',
  styleUrls: ['./redirect.page.scss'],
})
export class RedirectPage implements OnInit {

  constructor(private authService: AuthService, private router: Router, private userService: UserService) { }

  async ngOnInit() {
    const uid = await this.authService.getAuth().currentUser.uid;
    await this.userService.getMainHome(uid).subscribe(data =>{
      if(data.mainHome){
        if(data.mainHome != ""){
          this.router.navigateByUrl('/menu/tabs/'+data.mainHome);
        }
        else{
          this.router.navigateByUrl('/menu');
        }
      }
      else{
        this.router.navigateByUrl('/menu');
      }
    });
  }
}

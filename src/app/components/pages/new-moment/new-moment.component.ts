import { Component} from '@angular/core';
import { Moment } from 'src/app/Moments';
import { MomentsService } from 'src/app/services/moments.service';
import { MessagensService } from 'src/app/services/messagens.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-new-moment',
  templateUrl: './new-moment.component.html',
  styleUrls: ['./new-moment.component.css']
})
export class NewMomentComponent {
  
  btnText="Compartilhar"
  constructor(
    private momentService: MomentsService, 
    private messageService: MessagensService,
    private router: Router
  ){}

  async createHandler(moment:Moment){
    const formData = new FormData()
    formData.append('title', moment.title)
    formData.append('description', moment.description)
    if(moment.image){
      formData.append('image', moment.image)
    }

    //to do
    await this.momentService.createMoment(formData).subscribe()
    this.messageService.add("Momento adicionado com sucesso")
    
    this.router.navigate(['/'])
  }
  
}  

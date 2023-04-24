import { Component } from '@angular/core';
import { Moment } from 'src/app/Moments';
import { MomentsService } from 'src/app/services/moments.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MessagensService } from 'src/app/services/messagens.service';

@Component({
  selector: 'app-edit-moment',
  templateUrl: './edit-moment.component.html',
  styleUrls: ['./edit-moment.component.css']
})
export class EditMomentComponent {
  moment!:Moment
  btnText:string='Editar'

  constructor(
    private momentService: MomentsService,
    private route: ActivatedRoute,
    private messagensService: MessagensService,
    private router: Router
  ){}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'))

    this.momentService.getMoment(id).subscribe(item=>{
      this.moment=item.data
    })
  }
  async editHandler(momentData: Moment){
    const id = this.moment.id
    const formData = new FormData()
    formData.append('title', momentData.title)
    formData.append('description', momentData.description)

    if(momentData.image){
      formData.append('image', momentData.image)
    }

    await this.momentService.upDateMoment(id!, formData).subscribe()

    this.messagensService.add(`Momento ${id} foi atualizado com sucesso`)

    this.router.navigate(['/'])
  }

}
 
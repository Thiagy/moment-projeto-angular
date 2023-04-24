import { Component } from '@angular/core';
import { MomentsService } from 'src/app/services/moments.service';
import { Moment } from 'src/app/Moments';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environment/environment';
import { faTimes, faEdit } from '@fortawesome/free-solid-svg-icons';
import { MessagensService } from 'src/app/services/messagens.service';
import { Comment } from 'src/app/comments';
import { CommentService } from 'src/app/services/comment.service';
import { FormGroup, FormControl, Validator, FormGroupDirective, Validators } from '@angular/forms';


@Component({
  selector: 'app-moment',
  templateUrl: './moment.component.html',
  styleUrls: ['./moment.component.css']
})
export class MomentComponent {
  moment!:Moment
  baseApiUrl = environment.baseApiUrl

  faTimes = faTimes
  faEdit = faEdit

  commentForm!:FormGroup
  
  constructor(
    private momentService: MomentsService, 
    private route: ActivatedRoute,
    private messageService: MessagensService,
    private router: Router,
    private commentService: CommentService
  ){}

  ngOnInit():void{
    const id = Number(this.route.snapshot.paramMap.get('id'))

    this.momentService.getMoment(id).subscribe((item)=> (this.moment = item.data))

    this.commentForm = new FormGroup({
      text: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required])
    })
  }

  get text(){
    return this.commentForm.get('text')!
  }
  get username(){
    return this.commentForm.get('username')!
  }
  async removeHandler(id:number){
    await this.momentService.removeMoment(id).subscribe()

    this.messageService.add("Momento excluído com sucesso")
    this.router.navigate(['/'])
  }

  async onSubmit(formDirective: FormGroupDirective){
    if(this.commentForm.invalid){
      return
    }
    const data: Comment = this.commentForm.value

    data.momentId = Number(this.moment!.id)

    await this.commentService.createComment(data).subscribe((comment)=>this.moment!.comments!.push(comment.data))

    this.messageService.add("Comentário adicionado com sucesso")

    this.commentForm.reset()

    formDirective.resetForm()
  }
}
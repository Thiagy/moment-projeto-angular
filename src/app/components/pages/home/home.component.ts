import { Component, OnInit } from '@angular/core';
import { Moment } from 'src/app/Moments';
import { MomentsService } from 'src/app/services/moments.service';
import { environment } from 'src/environment/environment';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  allmoments:Moment[]=[]
  moments:Moment[]=[]
  baseApiUrl = environment.baseApiUrl

  faSearch = faSearch
  searchTerm : string=''
  


  constructor(private momentService:MomentsService){}

  ngOnInit():void{
    this.momentService.getMoments().subscribe((itens)=>{
      const data = itens.data

      data.map((item)=>{
        item.created_at = new Date(item.created_at!).toLocaleDateString('pt-BR')
      })
      this.allmoments = data
      this.moments = data
    })
  }

  search(e:Event):void{
    const target = e.target as HTMLInputElement
    const value = target.value

    this.moments = this.allmoments.filter((moment)=> {
      return moment.title.toLocaleUpperCase().includes(value)
    })
  }
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { IProcess } from 'src/app/model/process';


@Component({
  selector: 'app-claim',
  templateUrl: './claim.component.html',
  styleUrls: ['./claim.component.css']
})
export class ClaimComponent implements OnInit {
  @ViewChild('informationProcess') informationProcessComponent: any;
  @ViewChild('appContact') appContact: any;
  public process!: IProcess
  dropDownListData: any = {}
  validFormInformation: boolean = false

  constructor(private dbService: DataService) {
  }

  ngOnInit(): void {
    //Import data from DataService
    this.dbService.getProcessesObject().subscribe(data => {
      this.process = data
    })
    this.dbService.getDropDownLists().subscribe(data => {
      this.dropDownListData = data
    })
  }
  //Validation check from two form
  onFormGroupChangeEvent() {
    let found = this.process.contactPersons.find((f: any) => f.deliveryFlag == true)
    if (this.informationProcessComponent.ngForm.form.status == "INVALID" || !found) {
      this.validFormInformation = false
    }
    else {
      this.validFormInformation = true
    }
  }
  //Process refresh
  public resetForms(): void {
    this.informationProcessComponent.ngForm.resetForm();
    this.appContact.ngForm.resetForm();
    this.process.contactPersons.map((item: any) => item.deliveryFlag = false) //Reset all contact checkbox 
  }
  ///Log form after submit
  logProcess() {
    console.log("log form"+this.process);
  }
}

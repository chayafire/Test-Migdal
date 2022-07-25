import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataService } from 'src/app/data.service';
import { IProcess } from 'src/app/model/process';

@Component({
  selector: 'app-concentration-information-process',
  templateUrl: './concentration-information-process.component.html',
  styleUrls: ['./concentration-information-process.component.css']
})
export class ConcentrationInformationProcessComponent implements OnInit {

  public claimDetails: any = {}
  @Input() process!: IProcess
  @Input() dropDownListData: any | undefined
  @Output() formGroupChange: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('form', { static: true }) ngForm!: NgForm;
  information: any = {}
  public str: any
  injuryTypeIsdisabled: Boolean = false
  formChangesSubscription: any;
  validSubmitedBy: Boolean = false
  constructor(private dbService: DataService) {
  }
  ngOnInit(): void {
    //Update the parent
    this.formChangesSubscription = this.ngForm.form.valueChanges.subscribe(x => {
      this.formGroupChange.emit(this.ngForm.form);
    })
  }

}





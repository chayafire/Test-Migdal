import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataService } from 'src/app/data.service';
import { IProcess } from 'src/app/model/process';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
  @Input() process!: IProcess
  @Input() dropDownListData: any | undefined
  @ViewChild('form', { static: true }) ngForm!: NgForm;
  @Output() formGroupChange: EventEmitter<any> = new EventEmitter<any>();
  newContact: any = {}
  showAddnew: boolean = false
  typeContact: any = {}
  contactPersonsType: any = {}
  formChangesSubscription: any;

  constructor(private dbService: DataService) { }

  ngOnInit(): void {

  }

  //Add new contact
  addNewContact() {
    console.log("this" + this.newContact);
    this.typeContact.code = this.newContact.type
    let found = this.dropDownListData['contactPersonType/submitedBy'].find((f: any) => this.newContact.type == f.code)
    this.typeContact.value = found.value
    this.newContact.type = this.typeContact
    this.process.contactPersons.push(this.newContact)
    console.log("new", this.newContact, this.process.contactPersons);
    this.newContact = {}
    this.typeContact = {}
    this.ngForm.form.reset()
    this.showAddnew = false
  }

  //Update parents to validitaion forms
  sendFormInformation() {
    this.formChangesSubscription = this.ngForm.form.valueChanges.subscribe(x => {
      console.log(x);
    })
    console.log("this" + this.process.contactPersons[0].deliveryFlag);
    this.formGroupChange.emit();
  }


}

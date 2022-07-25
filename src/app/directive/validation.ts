
import { Validator, NG_VALIDATORS, FormControl } from '@angular/forms'
import { Directive, OnInit, Input } from '@angular/core';
import { IProcess } from '../model/process';


@Directive({
    selector: '[submitedByValidator]',
    providers: [
        { provide: NG_VALIDATORS, useExisting: submitedByValidatorDirective, multi: true }
    ]
})
export class submitedByValidatorDirective implements Validator, OnInit {
    find: boolean = false
    @Input("process") process!: IProcess
    ngOnInit() {
    }
    validate(c: FormControl) {
        for (let j in this.process.contactPersons) {
            let code = this.process.contactPersons[j].type.code
            if (code === c.value) {
                this.find = true
                return null
            }
            else
                this.find = false
        }
        if (this.find === true) {
            return null;
        }
        else {
            return { 'submitedBy': true, 'requiredValue': 10 }
        }
    }
}
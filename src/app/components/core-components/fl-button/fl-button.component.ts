// For Reference -> https://bitbucket.org/lawzo-git/web-client-v6/src/fl-button/src/app/components/login/login.component.html
import { CommonModule } from '@angular/common';
import { forwardRef, Component, Input, OnInit, ContentChild, TemplateRef, OnChanges } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormsModule } from '@angular/forms';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'fl-button',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './fl-button.component.html',
  styleUrls: ['./fl-button.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FlButtonComponent),
      multi: true,
    },
  ],
})
export class FlButtonComponent implements ControlValueAccessor, OnInit, OnChanges {
  isDisabled = false;
  value: any;
  applyHover = '';
  @Input() fill: boolean = false;
  @Input() outline: boolean = false;
  @Input() loading: boolean = false;
  @Input() disabled: boolean = false;
  @Input() class: string = '';
  @Input() backgroundColor: any = '';
  @Input() size: string = '';
  @ContentChild('flSuffix', { static: false })
  flSuffix!: TemplateRef<any>;
  @ContentChild('flPrefix', { static: false })
  flPrefix!: TemplateRef<any>;
  onChange: (value: string) => void = () => {};
  onTouched: Function = () => {};
  onClick: Function = () => {};

  ngOnInit() {
    this.fill = this.outline ? false : true;
    this.applyHover = this.backgroundColor.length
      ? '0px 15px 30px -5px ' + `${this.hexToRgb(this.backgroundColor)}`
      : '';
    this.class = this.class.length ? this.class : 'fl-primary';
  }

  ngOnChanges() {
    this.outline = this.outline;
    this.fill = this.outline ? false : true;
    this.class = this.class.length ? this.class : 'fl-primary';
  }

  writeValue(value: string) {
    this.value = value || '';
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  registerOnClick(fn: any) {
    this.onClick = fn;
  }

  setDisabledState(disabled: boolean) {
    this.isDisabled = disabled;
  }

  hexToRgb(hex: any) {
    hex = hex.indexOf('#') > -1 ? hex.split('#')[1] : hex;
    const bigint = parseInt(hex, 16);
    // tslint:disable-next-line: no-bitwise
    const r = (bigint >> 16) & 255;
    // tslint:disable-next-line: no-bitwise
    const g = (bigint >> 8) & 255;
    // tslint:disable-next-line: no-bitwise
    const b = bigint & 255;
    return `rgb(${r}, ${g}, ${b}, 0.2)`;
  }

  checkDisabled(event: MouseEvent): void {
    if (this.disabled) {
      event.stopImmediatePropagation();
      event.stopPropagation();
    }
  }
}

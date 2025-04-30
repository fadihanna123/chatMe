import { Component, Input } from '@angular/core';

/**
 * @author Fadi Hanna
 */

@Component({
    selector: 'Header',
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss',
    standalone: false
})
export class HeaderComponent {
  @Input() public login!: boolean;
}

import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoriesComponent {
certs: any[] = [
  {
    "title":"SalesForce Certifications",
    "id": "1",
    "src":"https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Salesforce.com_logo.svg/1200px-Salesforce.com_logo.svg.png"
  },
  {
    "title":"ServiceNow Certifications",
    "id": "2",
    "src":"https://logos-world.net/wp-content/uploads/2022/02/ServiceNow-Logo.jpg"
  },
  {
    "title":"CISCO Certifications",
    "id": "3",
    "src":"https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Cisco_logo.svg/1024px-Cisco_logo.svg.png"
  },
  {
    "title":"CompTIA Certifications",
    "id": "4",
    "src":"https://images.credly.com/images/63482325-a0d6-4f64-ae75-f5f33922c7d0/CompTIA_A_2Bce.png"
  },
  {
    "title":"CISSP Certifications",
    "id": "5",
    "src":"https://images.credly.com/images/5e6f5247-1d61-4932-a5da-999a7feec067/isc2_cissp2.png"
  },
  {
    "title":"AWS Certifications",
    "id": "6",
    "src":"https://static-00.iconduck.com/assets.00/aws-icon-512x512-hniukvcn.png"
  },
]
}

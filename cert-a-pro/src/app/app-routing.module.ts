import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage/homepage.component';
import { CategoriesComponent } from './categories/categories.component';
import { CertificationsComponent } from './certifications/certifications.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { QuestionselectorComponent } from './questionselector/questionselector.component'
import { QuizComponent } from './quiz/quiz.component';

const routes: Routes = [
  { path: '', redirectTo: '/homepage', pathMatch: 'full'},
  { path: 'homepage', component: HomepageComponent },
  { path: 'categories', component: CategoriesComponent },
  { path: 'certifications', component: CertificationsComponent },
  { path: 'certifications/:id', component: CertificationsComponent },
  {path:'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'selection', component: QuestionselectorComponent},
  {path: 'quiz', component: QuizComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage/homepage.component';
import { CategoriesComponent } from './categories/categories.component';
import { CertificationsComponent } from './certifications/certifications.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { QuestionselectorComponent } from './questionselector/questionselector.component'
import { QuizComponent } from './quiz/quiz.component';
import { AdminComponent } from './admin/admin.component';
import { AdminusersComponent } from './adminusers/adminusers.component';
import { AdminqComponent } from './adminq/adminq.component';
import { AdmincatComponent } from './admincat/admincat.component';
import { AdmincertComponent } from './admincert/admincert.component';
import { QuestionreviewComponent } from './questionreview/questionreview.component';

const routes: Routes = [
  { path: '', redirectTo: '/homepage', pathMatch: 'full'},
  { path: 'homepage', component: HomepageComponent },
  { path: 'categories', component: CategoriesComponent },
  { path: 'certifications', component: CertificationsComponent },
  { path: 'certifications/:id', component: CertificationsComponent },
  {path:'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'selection', component: QuestionselectorComponent},
  {path: 'quiz', component: QuizComponent},
  {path: 'admin', component: AdminComponent},
  {path: 'admin/users', component: AdminusersComponent},
  {path: 'admin/questions', component: AdminqComponent},
  {path: 'admin/categories', component: AdmincatComponent},
  {path: 'admin/certifications', component: AdmincertComponent},
  {path: 'quizreview', component: QuestionreviewComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

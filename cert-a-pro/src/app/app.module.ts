import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {AngularFireModule} from '@angular/fire/compat'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage/homepage.component';
import { CategoriesComponent } from './categories/categories.component';
import { CertificationsComponent } from './certifications/certifications.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAnalytics,getAnalytics,ScreenTrackingService,UserTrackingService } from '@angular/fire/analytics';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { provideFunctions,getFunctions } from '@angular/fire/functions';
import { provideMessaging,getMessaging } from '@angular/fire/messaging';
import { providePerformance,getPerformance } from '@angular/fire/performance';
import { provideRemoteConfig,getRemoteConfig } from '@angular/fire/remote-config';
import { provideStorage,getStorage } from '@angular/fire/storage';
import {Routes, RouterModule} from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component'
import { FormsModule } from '@angular/forms';
import { QuestionselectorComponent } from './questionselector/questionselector.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { QuizComponent } from './quiz/quiz.component';
import { AdminComponent } from './admin/admin.component';
import { AdminusersComponent } from './adminusers/adminusers.component';
import { AdminqComponent } from './adminq/adminq.component';
import { AdmincatComponent } from './admincat/admincat.component';
import { AdmincertComponent } from './admincert/admincert.component';
import { QuestionreviewComponent } from './questionreview/questionreview.component';
const appRoutes: Routes =[
  {path: 'certifications', component: CertificationsComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    CategoriesComponent,
    CertificationsComponent,
    LoginComponent,
    SignupComponent,
    QuestionselectorComponent,
    QuizComponent,
    AdminComponent,
    AdminusersComponent,
    AdminqComponent,
    AdmincatComponent,
    AdmincertComponent,
    QuestionreviewComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAnalytics(() => getAnalytics()),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),
    provideFunctions(() => getFunctions()),
    provideMessaging(() => getMessaging()),
    providePerformance(() => getPerformance()),
    provideRemoteConfig(() => getRemoteConfig()),
    provideStorage(() => getStorage()),
    NgbModule
  ],
  providers: [
    ScreenTrackingService,UserTrackingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

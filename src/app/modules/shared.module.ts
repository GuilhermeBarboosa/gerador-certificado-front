import { NgModule } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  exports: [],
  imports: [ToastrModule.forRoot()],
})
export class SharedModule {}

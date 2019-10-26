import { Injectable } from '@angular/core';

import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { SessionService } from '../services/session.service';

@Injectable()
export class SessionResolver implements Resolve<Observable<any>> {
    constructor(private sessionService: SessionService) { }

    resolve(route: ActivatedRouteSnapshot) {
        return this.sessionService.get(route.paramMap.get('id'));
    }
}

import { AuthService } from './auth.service';

export class BaseService {
    userId: string;
    constructor(authService: AuthService) {
        this.userId = authService.currentUserValue.userId;
    }
}

import { ApiProperty } from "@nestjs/swagger";


export class LoginDto{
    @ApiProperty({example: 'alanalvizo2'})
    readonly Username: string;

    @ApiProperty({ example: 'Your Password'})
    readonly Password: string;
}




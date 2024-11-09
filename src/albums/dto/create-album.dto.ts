import {
  IsNotEmpty,
  IsString,
  IsInt,
  IsUUID,
  ValidateIf,
} from 'class-validator';

export class CreateAlbumDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsInt()
  year: number;

  @ValidateIf((o) => !!o.artistId)
  @IsString()
  @IsUUID('4')
  artistId: string | null;
}

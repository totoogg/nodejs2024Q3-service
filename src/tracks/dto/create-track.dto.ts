import {
  IsInt,
  IsNotEmpty,
  IsString,
  IsUUID,
  ValidateIf,
} from 'class-validator';

export class CreateTrackDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @ValidateIf((o) => !!o.artistId)
  @IsString()
  @IsUUID('4')
  artistId: string | null;

  @ValidateIf((o) => !!o.albumId)
  @IsString()
  @IsUUID('4')
  albumId: string | null;

  @IsNotEmpty()
  @IsInt()
  duration: number;
}

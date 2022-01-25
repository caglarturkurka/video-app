import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Video {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public url: string;

  @Column()
  public title: string;

  @Column()
  public fileType: string;

  @Column()
  public fileSize: string;

  @Column()
  public description: string;
}

export default Video;

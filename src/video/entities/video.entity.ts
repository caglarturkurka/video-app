import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Video {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ nullable: false })
  public url: string;

  @Column({ nullable: false })
  public title: string;

  @Column()
  public fileType: string;

  @Column()
  public fileSize: number;

  @Column({ nullable: false })
  public description: string;
}

export default Video;

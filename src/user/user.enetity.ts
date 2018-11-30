import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: false })
  activated: boolean;

  @Column({ length: 64 })
  salt: string;

  @Column({ length: 250 })
  email: string; // acquired by register

  @Column({ length: 250 })
  username: string; // acquired by register

  @Column({ length: 250 })
  password: string; // acquired by register

  @Column({ length: 250 })
  company: string; // acquired by register

  @Column({ length: 250 })
  name: string; // acquired by register

  @Column({ length: 250 })
  phone: string; // acquired by register

  @Column({ length: 250, nullable: true, default: null })
  wechat: string; // acquired by register

  @Column({ type: 'int', default: 0 })
  patent_count: number;

  @Column({ type: 'int', default: 0 })
  text_count: number;

  @Column({ type: 'int', default: 0 })
  image_count: number;

  @Column({ type: 'int', default: 0 })
  text_count_t: number;

  @Column({ type: 'int', default: 0 })
  patent_count_t: number;

  @Column({ type: 'int', default: 0 })
  image_count_t: number;

  @Column({ type: 'int', default: 0 })
  login_time: number;

  @Column({ type: 'text', nullable: true })
  tag: string;
}

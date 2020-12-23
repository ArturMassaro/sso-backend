import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

// import Client from './Client';

@Entity('client_tokens')
class ClientToken {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column()
  client_uuid: string;

  @Column()
  token: string;

  @Column('boolean')
  is_revoked: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  // @ManyToOne(() => Client)
  // @JoinColumn({ name: 'client_uuid' })
  // client: Client;
}

export default ClientToken;

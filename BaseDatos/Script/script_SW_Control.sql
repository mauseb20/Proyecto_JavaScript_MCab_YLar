/*==============================================================*/
/* DBMS name:      MySQL 5.0                                    */
/* Created on:     14-Dec-16 11:27:39                           */
/*==============================================================*/


drop table if exists LABORATORIO;

drop table if exists LABORATORIO_MATERIA;

drop table if exists LABORATORIO_PROGRAMA;

drop table if exists MATERIA;

drop table if exists PROGRAMA;

/*==============================================================*/
/* Table: LABORATORIO                                           */
/*==============================================================*/
create table LABORATORIO
(
   CODIGOLAB            smallint not null,
   NOMBRELAB            char(10) not null,
   primary key (CODIGOLAB)
);

/*==============================================================*/
/* Table: LABORATORIO_MATERIA                                   */
/*==============================================================*/
create table LABORATORIO_MATERIA
(
   CODIGOLAB            smallint not null,
   CODIGOMAT            char(6) not null,
   PARALELO             char(4) not null,
   primary key (CODIGOLAB, CODIGOMAT)
);

/*==============================================================*/
/* Table: LABORATORIO_PROGRAMA                                  */
/*==============================================================*/
create table LABORATORIO_PROGRAMA
(
   CODIGOLAB            smallint not null,
   CODIGOPROG           char(6) not null,
   primary key (CODIGOLAB, CODIGOPROG)
);

/*==============================================================*/
/* Table: MATERIA                                               */
/*==============================================================*/
create table MATERIA
(
   CODIGOMAT            char(6) not null,
   NOMBREMAT            varchar(100) not null,
   primary key (CODIGOMAT)
);

/*==============================================================*/
/* Table: PROGRAMA                                              */
/*==============================================================*/
create table PROGRAMA
(
   CODIGOPROG           char(6) not null,
   NOMBREPROG           char(30) not null,
   TIPO                 char(20) not null,
   SERVICIO             char(15),
   CATEGORIA            char(10) not null,
   VERSION              char(10) not null,
   ANIO                 char(10),
   primary key (CODIGOPROG)
);

alter table LABORATORIO_MATERIA add constraint FK_LABORATORIO_MATERIA foreign key (CODIGOLAB)
      references LABORATORIO (CODIGOLAB) on delete restrict on update restrict;

alter table LABORATORIO_MATERIA add constraint FK_LABORATORIO_MATERIA2 foreign key (CODIGOMAT)
      references MATERIA (CODIGOMAT) on delete restrict on update restrict;

alter table LABORATORIO_PROGRAMA add constraint FK_LABORATORIO_PROGRAMA foreign key (CODIGOLAB)
      references LABORATORIO (CODIGOLAB) on delete restrict on update restrict;

alter table LABORATORIO_PROGRAMA add constraint FK_LABORATORIO_PROGRAMA2 foreign key (CODIGOPROG)
      references PROGRAMA (CODIGOPROG) on delete restrict on update restrict;


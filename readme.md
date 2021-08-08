```sql
create table if not exists phone
(
    id     int auto_increment
        primary key,
    price  float                        null,
    model  tinytext                     not null,
    color  text                         null,
    brand  text                         null,
    size   tinytext                     null,
    weight float                        null,
    images longtext collate utf8mb4_bin null,
    constraint images
        check (json_valid(`images`))
);


```
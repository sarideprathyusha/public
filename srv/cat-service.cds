using my.items as my from '../db/data-model';

service CatalogService {
     entity Items as projection on my.Items;
    
     function functionEdit(ID : String, cost: String) returns String;

}
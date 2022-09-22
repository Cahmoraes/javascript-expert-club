import database from './../database/data.json' assert { type: 'json' }
import { FluentSQLBuilder } from './fluentSQL.js'

const result = FluentSQLBuilder.for(database)
  // ou inicia com 2020 ou inicia com 2019
  .where({
    registered: /^(2020|2019)/,
  })
  // ^-> fala que é no início
  // $ -> fala que é no fim
  // | -> OU
  // parênteses literais precisam de space () => \(\) (numero1 | numero2 )
  .where({ category: /^(security|developer|quality assurance)$/ })
  .where({ phone: /\((852|850|810)\)/ })
  .select(['name', 'company', 'phone', 'category', 'registered'])
  .orderBy('category')
  .limit(2)
  .build()

console.table(result)

import BaseSVGDrawer from './BaseSVGDrawer'
import fs from 'fs'
import path from 'path'

let xml2js = require('xml2js')

let parser = new xml2js.Parser()
let builder = new xml2js.Builder()

interface StackResource {
  stack: string
  content: string
  parsed: any
}

export default class VSDrawer extends BaseSVGDrawer {
  private stacks: Array<string>
  private resources: Array<StackResource> = []
  private basedSvg: any

  constructor(stacks: Array<string>) {
    super()
    this.stacks = ['react', 'angular']
  }

  async init() {
    this.drawer.rect(1800, 1000).attr({ fill: '#3498db' })
    await parser.parseString(this.drawer.svg(), (err: any, result: any) => {
      this.basedSvg = result
    })
    for (let index in this.stacks) {
      let filePath = __dirname + path.normalize('/resources/' + this.stacks[index] + '-1.svg')
      if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf-8')
        let parseContent = ''
        await parser.parseString(content.toString(), (err: any, result: any) => {
          parseContent = result.svg.path
        })

        this.resources.push({
          stack: this.stacks[index],
          content: content.toString(),
          parsed: parseContent
        })
      }
    }
  }

  draw(): any {
    for (let index in this.resources) {
      let resource = this.resources[index]
      if (!this.basedSvg.svg.path) {
        this.basedSvg.svg.path = []
      }
      for (let j in resource.parsed) {
        this.basedSvg.svg.path.push(resource.parsed[j])
      }
    }
    return builder.buildObject(this.basedSvg)
  }
}

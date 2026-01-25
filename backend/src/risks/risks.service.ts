import {
  // common
  Injectable,
} from '@nestjs/common';
import { Risk } from './domain/risk';
import { LlmService } from 'src/llm/llm.service';
import { CreateRiskDto } from './dto/create-risk.dto';
import { UpdateRiskDto } from './dto/update-risk.dto';
import { CreateActionDto } from 'src/actions/dto/create-action.dto'; 
import { IPaginationOptions } from '../utils/types/pagination-options';
import { RiskRepository } from './infrastructure/persistence/risk.repository';
import { ActionRepository } from 'src/actions/infrastructure/persistence/action.repository';

@Injectable()
export class RisksService {
  constructor(
    // Dependencies here
    private readonly llmService: LlmService,
    // the actionRepository is injected instead of the actionService to avoid circular dependencies.
    // this is probably not cool but we'll see.
    private readonly actionRepository: ActionRepository, 
    private readonly riskRepository: RiskRepository,
  ) { }

  async create(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    createRiskDto: CreateRiskDto
  ) {
    // Do not remove comment below.
    // <creating-property />
    const risk = await this.riskRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      detection: createRiskDto.detection,

      occurrence: createRiskDto.occurrence,

      severity: createRiskDto.severity,

      description: createRiskDto.description,

      title: createRiskDto.title,
    });

    this.generateAction(risk)
      .then((actions) => this.setRiskActions(risk, actions));

    return risk;
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.riskRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: Risk['id']) {
    return this.riskRepository.findById(id);
  }

  findByIds(ids: Risk['id'][]) {
    return this.riskRepository.findByIds(ids);
  }

  async update(
    id: Risk['id'],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    updateRiskDto: UpdateRiskDto,
  ) {
    // Do not remove comment below.
    // <updating-property />
    return this.riskRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      detection: updateRiskDto.detection,

      occurrence: updateRiskDto.occurrence,

      severity: updateRiskDto.severity,

      description: updateRiskDto.description,

      title: updateRiskDto.title,

    });
  }

  remove(id: Risk['id']) {
    return this.riskRepository.remove(id);
  }

  async generateAction(risk: Risk): Promise<CreateActionDto[]> {
    // TODO: this should probably be extracted into a config parameter. 
    const llmRequest = {
      content: 
        "//Context Start//" +
        "The INSAT Junior Enterprise is a non-profit association founded in 2005 and joined the National Confederation" +
        "of Junior Enterprises (JET) in 2013. The mission of the INSAT Junior Enterprise is to train students" +
        "in the field of entrepreneurship and thereby facilitate their integration into professional life." +
        "The services provided by the INSAT Junior Enterprise mainly revolve around website development," +
        "mobile application development, and search engine optimization (SEO) of websites." +
        "In the process of carrying out its projects Junior Entreprise INSAT might encouter some risks." + 
        "Given a risk, Your role is to provide some corrective or preventive actions to mitigate the risk." + 
        "Your input will be a json object representing a risk in the following format: { title?: string | null, description?: string | null, detection?: number | null, occurrence?: number | null, severity?: number | null }" +
        "You should output a json object representing a list of mitigation actions in the following format: { actions?: { title?: string | null, description?: string | null, type?: 'PREVENTIVE' | 'CORRECTIVE' | null } }" +
        "If you fail to generate the appropriate actions simply return an empty json object to prevent json parsing errors." + 
        "//Context End//" + 
        "// Prompt Start //" +
        JSON.stringify({ 
          title: risk.title, 
          description: risk.description,  
          severity: risk.severity,  
          detection: risk.detection,  
          occurrence: risk.occurrence,  
        }) + 
        "// Prompt End //"
    }

    const llmResponse = await this.llmService.send(llmRequest);
    console.log("AI generated actions: ", llmResponse);

    if(llmResponse.options.length > 0) {
      let actions = [];

      llmResponse.options.forEach(o => {
        if(o.content.startsWith("```json")) { o.content = o.content.slice(7); }
        if(o.content.endsWith("```")) { o.content = o.content.slice(0, o.content.length - 3); }

        try {
          actions = actions.concat(JSON.parse(o.content).actions);
        } catch {
          console.log("Failed to parse AI generated actions");
        }
      });

      console.log("Parsed actions: ", actions);
      return actions;
    }

    return [];
  }

  async setRiskActions(risk: Risk, actions: CreateActionDto[]) {
    actions.forEach(a => this.actionRepository.create({ ...a, risk }));
  }
}

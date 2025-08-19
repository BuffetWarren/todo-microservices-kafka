import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { PersonsService } from "./persons.service";
import { PersonDto, PersonFilterRequestDto, UpdatePersonDto } from "./types";
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from "@nestjs/swagger";

@Controller()
export class PersonsController {
    constructor(private personService: PersonsService) { }

    @Post('create')
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({
        summary: 'Créer une personne',
        description: 'Ajoute une nouvelle personne dans le système.',
    })
    @ApiResponse({ status: 201, description: 'Personne créée avec succès.' })
    @ApiResponse({ status: 400, description: 'Données invalides.' })
    @ApiBody({ type: PersonDto })
    createPerson(@Body() createPersonDto: PersonDto) {
        return this.personService.createPerson(createPersonDto);
    }

    @Put(':id')
    @ApiOperation({
        summary: 'Mettre à jour une personne',
        description: "Modifie les informations d'une personne existante.",
    })
    @ApiParam({ name: 'id', required: true, description: "L'ID de la personne" })
    @ApiResponse({ status: 200, description: 'Personne mise à jour avec succès.' })
    @ApiResponse({ status: 400, description: 'Données invalides.' })
    @ApiResponse({ status: 404, description: 'Personne non trouvée.' })
    @ApiBody({ type: UpdatePersonDto })
    async updatePerson(@Param('id', ParseIntPipe) id: number, @Body() updatePersonDto: PersonDto) {
        return await this.personService.updatePerson(id, updatePersonDto);
    }

    @Delete('delete/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({
        summary: 'Supprimer une personne',
        description: 'Supprime une personne du système.',
    })
    @ApiParam({ name: 'id', required: true, description: "L'ID de la personne" })
    @ApiResponse({ status: 204, description: 'Personne supprimée avec succès.' })
    @ApiResponse({ status: 404, description: 'Personne non trouvée.' })
    async deletePerson(@Param('id', ParseIntPipe) id: number) {
        const person = await this.personService.deletePerson(id);
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({
        summary: 'Obtenir une personne par ID',
        description: 'Retourne une personne spécifique en fonction de son ID.',
    })
    @ApiParam({ name: 'id', required: true, description: "L'ID de la personne" })
    @ApiResponse({ status: 200, description: 'Personne trouvée.' })
    @ApiResponse({ status: 404, description: 'Personne non trouvée.' })
    async getPerson(@Param('id', ParseIntPipe) id: number) {
        return await this.personService.getPerson(id);
    }

    @Get('search-all')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({
        summary: 'Lister toutes les personnes',
        description: 'Retourne toutes les personnes enregistrées avec pagination.',
    })
    @ApiResponse({
        status: 200,
        description: 'Liste des personnes récupérée avec succès.',
    })
    async selectAll() {
        return this.personService.selectMany();
    }

     @Post('search')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({
        summary: 'Rechercher les personnes',
        description: 'Effectue une recherche paginée sur les personnes.',
    })
    @ApiBody({ type: PersonFilterRequestDto })
    @ApiResponse({
        status: 200,
        description: 'Résultats de recherche retournés avec succès.',
    })
    async searchPersons(@Body() query: PersonFilterRequestDto) {
        return await this.personService.fetchAll(query);
    }

    @Post('filter')
    @ApiOperation({
        summary: 'Filtrer les personnes',
        description: 'Effectue une recherche paginée avec filtres avancés sur les personnes.',
    })
    @ApiBody({ type: PersonFilterRequestDto })
    @ApiResponse({
        status: 200,
        description: 'Liste filtrée des personnes',
    })
    async filter(@Body() body: PersonFilterRequestDto) {
        const { page, limit, sortBy, orderBy, search, filters } = body;
        return this.personService.filter(page, limit, search, filters, sortBy, orderBy);
    }
}
import { Request, Response } from 'express';
import knex from '../database/connection';
import ItemsController from './ItemsController';

class PointsController {
  async index(request: Request, response: Response) {
    const { city, uf } = request.query;

    

    const points = await knex('startups')
      .where('city', String(city))
      .where('uf', String(uf))
      .distinct()
      .select('points.*');

    const serializedPoints = points.map((point) => {
      return {
        ...point,
        image_url: `http://192.168.31.122:3333/uploads/${point.image}`,
      };
    });

    return response.json(serializedPoints);
  }

  async show(request: Request, response: Response) {
    const { id } = request.params;

    const point = await knex('startups').where('id', id).first();

    if (!point) {
      return response.status(400).json({ message: 'Startup not found.' });
    }

    const serializedPoint = {
      ...point,
      image_url: `http://localhost:3333/uploads/${point.image}`,
    };

    const items = await knex('items')
      .join('point_items', 'items.id', '=', 'point_items.item_id')
      .where('point_items.point_id', id)
      .select('items.title');

    return response.json({ point: serializedPoint, items });
  }

  async create(request: Request, response: Response) {
    const {
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
    } = request.body;

    const trx = await knex.transaction();

    const point = {
      image: request.file.filename,
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
    };

    const insertedIds = await trx('startups').insert(point);

    const point_id = insertedIds[0];

    // const pointItems = items
    //   .split(',')
    //   .map((item: string) => Number(item.trim()))
    //   .map((item_id: number) => {
    //     return {
    //       item_id,
    //       point_id,
    //     };
    //   });

    // await trx('point_items').insert(pointItems);

    await trx.commit();

    return response.json({
      id: point_id,
      ...point,
    });
  }
}

export default PointsController;

import { Request, Response } from "express";
import { FilterQuery, PipelineStage } from "mongoose";
import { Icon } from "../../databases/mongo/models";
import { IntIcons } from "../../databases/mongo/models/Icon";
import { unlinkAsync } from "../middlewares/multer";
import { ObjectId } from "mongodb";

export class IconsService {
  // public async getVaccineSummary(req: Request, res: Response) {
  //   const { c, dateFrom, dateTo, rangeSize } = req.query;
  //   const aggr: PipelineStage[] = [];
  //   const YearWeekISO = { $toDate: "$YearWeekISO" };
  //   if (c || dateFrom || dateTo) {
  //     const $match: FilterQuery<IntIcons> = {};
  //     if (c) {
  //       $match.ReportingCountry = c;
  //     }
  //     if (dateFrom && dateTo) {
  //       $match.$expr = {
  //         $and: [
  //           {
  //             $gte: [YearWeekISO, { $toDate: dateFrom }],
  //           },
  //           {
  //             $lt: [YearWeekISO, { $toDate: dateTo }],
  //           },
  //         ],
  //       };
  //     } else {
  //       if (dateFrom) {
  //         $match.$expr = {
  //           $gte: [YearWeekISO, { $toDate: dateFrom }],
  //         };
  //       }
  //       if (dateTo) {
  //         $match.$expr = {
  //           $lt: [YearWeekISO, { $toDate: dateTo }],
  //         };
  //       }
  //     }
  //     aggr.push({ $match });
  //   }
  //   aggr.push(
  //     {
  //       $project: {
  //         fiveWeekperiod: {
  //           $subtract: [
  //             { $week: YearWeekISO },
  //             { $mod: [{ $week: YearWeekISO }, 5] },
  //           ],
  //         },
  //         date: YearWeekISO,
  //         NumberDosesReceived: 1,
  //       },
  //     },
  //     {
  //       $group: {
  //         _id: {
  //           year: { $year: "$date" },
  //           fiveWeek: "$fiveWeekperiod",
  //         },
  //         weekStart: { $min: "$date" },
  //         weekEnd: { $max: "$date" },
  //         NumberDosesReceived: { $sum: "$NumberDosesReceived" },
  //       },
  //     },
  //     {
  //       $project: {
  //         _id: 0,
  //         weekStart: {
  //           $dateToString: {
  //             date: "$weekStart",
  //             format: "%G-W%V",
  //           },
  //         },
  //         weekEnd: {
  //           $dateToString: {
  //             date: {
  //               $dateAdd: {
  //                 startDate: "$weekEnd",
  //                 unit: "week",
  //                 amount: 1,
  //               },
  //             },
  //             format: "%G-W%V",
  //           },
  //         },
  //         NumberDosesReceived: 1,
  //       },
  //     }
  //   );
  //   aggr.push({
  //     $sort: {
  //       weekStart: 1,
  //     },
  //   });
  //   if (rangeSize) {
  //     aggr.push({ $limit: Number(rangeSize || 100) });
  //   }
  //   const data = await VaccineSummary.aggregate(aggr);
  //   res.send({
  //     summary: data,
  //   });
  // }

  public async addPngIcon(req: Request, res: Response) {
    const { bundleName, iconName, tags, iconType } = req.body;
    let newProduct = await Icon.create({
      bundleName,
      iconName,
      tags,
      iconPng: (req as any).files.iconPng[0],
      iconSvg: (req as any).files.iconSvg[0],
      iconType,
    });

    await newProduct.save();
    res.send({ data: newProduct, message: "Icon Uploaded Successfully." });
  }

  public async getIcons(req: Request, res: Response) {
    const data = await Icon.aggregate([
      {
        $project: {
          __v: 0,
          updatedAt: 0,
        },
      },
    ]);
    res.send({ data });
  }

  public async deleteIcon(req: Request, res: Response) {
    const data: any = await Icon.findOneAndDelete({ _id: new ObjectId(req.params.id) });
    if (data?.icon?.path) {
      await unlinkAsync(data?.icon?.path);
    }
    res.send({ message: "Icons Deleted Successfully." });
  }
}

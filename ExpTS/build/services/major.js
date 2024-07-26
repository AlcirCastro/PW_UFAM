"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateMajor = exports.removeMajor = exports.getMajor = exports.getMajors = exports.createMajor = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createMajor = (major) => __awaiter(void 0, void 0, void 0, function* () {
    return prisma.major.create({ data: major });
});
exports.createMajor = createMajor;
const getMajors = () => __awaiter(void 0, void 0, void 0, function* () {
    return prisma.major.findMany();
});
exports.getMajors = getMajors;
const getMajor = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return prisma.major.findUnique({ where: { id } });
});
exports.getMajor = getMajor;
const removeMajor = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return prisma.major.delete({
        where: { id }
    });
});
exports.removeMajor = removeMajor;
const updateMajor = (id, major) => __awaiter(void 0, void 0, void 0, function* () {
    return prisma.major.update({
        where: { id },
        data: major
    });
});
exports.updateMajor = updateMajor;

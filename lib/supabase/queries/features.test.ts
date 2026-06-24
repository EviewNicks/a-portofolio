/**
 * Unit tests for project features database queries using a mock Prisma context
 * Feature: project-features-showcase
 */
import {
  getFeaturesByProjectId,
  getFeatureById,
  createFeature,
  updateFeature,
  deleteFeature,
  updateFeatureDisplayOrder,
  getFeatureMedia,
  createFeatureMedia,
  deleteFeatureMedia,
} from './features'
import prisma from '@/prisma/lib/client'

// Mock the global prisma client
jest.mock('@/prisma/lib/client', () => {
  return {
    __esModule: true,
    default: {
      project: {
        findUnique: jest.fn(),
      },
      projectFeature: {
        findMany: jest.fn(),
        findUnique: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
      },
      projectFeatureMedia: {
        findMany: jest.fn(),
        create: jest.fn(),
        delete: jest.fn(),
      },
      $transaction: jest.fn(),
    },
  }
})

describe('Project Features Queries', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('getFeaturesByProjectId', () => {
    it('returns empty array if project does not exist', async () => {
      ;(prisma.project.findUnique as jest.Mock).mockResolvedValue(null)

      const result = await getFeaturesByProjectId('non-existent-proj')
      expect(result).toEqual([])
      expect(prisma.project.findUnique).toHaveBeenCalledWith({
        where: { id: 'non-existent-proj' },
      })
      expect(prisma.projectFeature.findMany).not.toHaveBeenCalled()
    })

    it('returns features ordered by display_order if project exists', async () => {
      const mockProject = { id: 'proj-1', title: 'Test Project' }
      const mockFeatures = [
        { id: 'feat-1', title: 'Feature 1', display_order: 1, media: [] },
        { id: 'feat-2', title: 'Feature 2', display_order: 2, media: [] },
      ]

      ;(prisma.project.findUnique as jest.Mock).mockResolvedValue(mockProject)
      ;(prisma.projectFeature.findMany as jest.Mock).mockResolvedValue(
        mockFeatures
      )

      const result = await getFeaturesByProjectId('proj-1')
      expect(result).toEqual(mockFeatures)
      expect(prisma.projectFeature.findMany).toHaveBeenCalledWith({
        where: { project_id: 'proj-1' },
        orderBy: { display_order: 'asc' },
        include: {
          media: {
            orderBy: { display_order: 'asc' },
          },
        },
      })
    })
  })

  describe('getFeatureById', () => {
    it('fetches feature with media sorted by display_order', async () => {
      const mockFeature = {
        id: 'feat-1',
        title: 'Feature 1',
        media: [{ id: 'm-1', display_order: 1 }],
      }

      ;(prisma.projectFeature.findUnique as jest.Mock).mockResolvedValue(
        mockFeature
      )

      const result = await getFeatureById('feat-1')
      expect(result).toEqual(mockFeature)
      expect(prisma.projectFeature.findUnique).toHaveBeenCalledWith({
        where: { id: 'feat-1' },
        include: {
          media: {
            orderBy: { display_order: 'asc' },
          },
        },
      })
    })
  })

  describe('createFeature', () => {
    it('calls prisma.projectFeature.create with correct data', async () => {
      const newFeatureData = {
        project_id: 'proj-1',
        title: 'New Feature',
        display_order: 0,
        tech_stack: ['React'],
        is_featured: false,
      }

      ;(prisma.projectFeature.create as jest.Mock).mockResolvedValue({
        id: 'feat-new',
        ...newFeatureData,
      })

      const result = await createFeature(newFeatureData)
      expect(result.id).toBe('feat-new')
      expect(prisma.projectFeature.create).toHaveBeenCalledWith({
        data: newFeatureData,
      })
    })
  })

  describe('updateFeature', () => {
    it('calls prisma.projectFeature.update with correct parameters', async () => {
      const updateData = { title: 'Updated Title' }
      ;(prisma.projectFeature.update as jest.Mock).mockResolvedValue({
        id: 'feat-1',
        title: 'Updated Title',
      })

      const result = await updateFeature('feat-1', updateData)
      expect(result.title).toBe('Updated Title')
      expect(prisma.projectFeature.update).toHaveBeenCalledWith({
        where: { id: 'feat-1' },
        data: updateData,
      })
    })
  })

  describe('deleteFeature', () => {
    it('calls prisma.projectFeature.delete', async () => {
      ;(prisma.projectFeature.delete as jest.Mock).mockResolvedValue({
        id: 'feat-1',
      })

      const result = await deleteFeature('feat-1')
      expect(result.id).toBe('feat-1')
      expect(prisma.projectFeature.delete).toHaveBeenCalledWith({
        where: { id: 'feat-1' },
      })
    })
  })

  describe('updateFeatureDisplayOrder', () => {
    it('executes bulk updates in a transaction', async () => {
      const updates = [
        { id: 'feat-1', display_order: 3 },
        { id: 'feat-2', display_order: 1 },
      ]

      ;(prisma.$transaction as jest.Mock).mockResolvedValue(updates)

      await updateFeatureDisplayOrder(updates)

      expect(prisma.$transaction).toHaveBeenCalled()
      expect(prisma.projectFeature.update).toHaveBeenCalledTimes(2)
      expect(prisma.projectFeature.update).toHaveBeenNthCalledWith(1, {
        where: { id: 'feat-1' },
        data: { display_order: 3 },
      })
      expect(prisma.projectFeature.update).toHaveBeenNthCalledWith(2, {
        where: { id: 'feat-2' },
        data: { display_order: 1 },
      })
    })
  })

  describe('getFeatureMedia', () => {
    it('fetches media ordered by display_order', async () => {
      const mockMedia = [{ id: 'm-1', display_order: 1 }]
      ;(prisma.projectFeatureMedia.findMany as jest.Mock).mockResolvedValue(
        mockMedia
      )

      const result = await getFeatureMedia('feat-1')
      expect(result).toEqual(mockMedia)
      expect(prisma.projectFeatureMedia.findMany).toHaveBeenCalledWith({
        where: { feature_id: 'feat-1' },
        orderBy: { display_order: 'asc' },
      })
    })
  })

  describe('createFeatureMedia', () => {
    it('creates a media record', async () => {
      const mockMediaInput = {
        feature_id: 'feat-1',
        storage_path: 'path/to/file.jpg',
        public_url: 'http://cdn/file.jpg',
        file_name: 'file.jpg',
        display_order: 0,
      }

      ;(prisma.projectFeatureMedia.create as jest.Mock).mockResolvedValue({
        id: 'media-1',
        ...mockMediaInput,
      })

      const result = await createFeatureMedia(mockMediaInput)
      expect(result.id).toBe('media-1')
      expect(prisma.projectFeatureMedia.create).toHaveBeenCalledWith({
        data: mockMediaInput,
      })
    })
  })

  describe('deleteFeatureMedia', () => {
    it('deletes a media record by ID', async () => {
      ;(prisma.projectFeatureMedia.delete as jest.Mock).mockResolvedValue({
        id: 'media-1',
      })

      const result = await deleteFeatureMedia('media-1')
      expect(result.id).toBe('media-1')
      expect(prisma.projectFeatureMedia.delete).toHaveBeenCalledWith({
        where: { id: 'media-1' },
      })
    })
  })
})

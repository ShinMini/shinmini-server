import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common'
import { PostService } from './post.service'
import { Post as PostModel, Prisma } from '@prisma/client'

@Controller('shinmini-homepage/us-central1/api/post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get(':id')
  async getPostById(@Param('id') id: string): Promise<PostModel> {
    return this.postService.post({ id: Number(id) })
  }

  @Get('feed')
  async getPublishedPosts(): Promise<PostModel[]> {
    return this.postService.posts({
      where: { published: true },
    })
  }

  @Get('filtered-posts/:searchString')
  async getFilteredPosts(
    @Param('searchString') searchString: string
  ): Promise<PostModel[]> {
    return this.postService.posts({
      where: {
        OR: [
          {
            title: { contains: searchString },
          },
          {
            content: { contains: searchString },
          },
        ],
      },
    })
  }

  @Post()
  async createDraft(
    @Body() postData: { title: string; content?: string; authorEmail: string }
  ): Promise<PostModel> {
    const { title, content, authorEmail: email } = postData
    const tags = ['latest', 'hot'] // later
    const categories = {
      connectOrCreate: [
        {
          where: { name: 'news' },
          create: { name: 'news' },
        },
        {
          where: { name: 'tech' },
          create: { name: 'tech' },
        },
      ],
    }

    const postScheme = {
      title,
      published: false,
      content,
      tags,
      author: {
        connect: {
          email,
        },
      },
      categories,
    } satisfies Prisma.PostCreateInput

    return this.postService.createPost(postScheme)
  }

  @Put('publish/:id')
  async publishPost(@Param('id') id: string): Promise<PostModel> {
    return this.postService.updatePost({
      where: { id: Number(id) },
      data: { published: true },
    })
  }

  @Delete(':id')
  async deletePost(@Param('id') id: string): Promise<PostModel> {
    return this.postService.deletePost({ id: Number(id) })
  }
}
